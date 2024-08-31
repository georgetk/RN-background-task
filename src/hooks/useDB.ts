import * as SQLite from 'expo-sqlite';
import {TApiNeededFields, TApiRawArticles} from '../types/apiDataType';
import {LOCAL_DB_CONSTANTS} from '../constants/localDbConstants';
import {ASYNC_STORAGE_KEYS} from '../constants/asyncStorageKeys';
import {LOGIC_CONSTANTS} from '../constants/logicConstants';
import {convertToTime} from '../utils/dateFormatter';

export const useDB = (): [
  () => Promise<SQLite.SQLiteDatabase>,
  (db: SQLite.SQLiteDatabase) => Promise<void>,
  (db: SQLite.SQLiteDatabase, {articles}: TApiRawArticles) => Promise<void>,
  (
    db: SQLite.SQLiteDatabase,
    neededCount: number,
    setCount: (count: string, asyncStorageKey: string) => Promise<void>,
  ) => Promise<TApiNeededFields[]>,
  (
    db: SQLite.SQLiteDatabase,
    previouslyDisplayedCount: number,
    setCount: (count: string, asyncStorageKey: string) => Promise<void>,
  ) => Promise<TApiNeededFields[]>,
] => {
  const getDBConnection = async () =>
    await SQLite.openDatabaseAsync(LOCAL_DB_CONSTANTS.DB_NAME);

  const createTable = async (db: SQLite.SQLiteDatabase) => {
    // create table if not exists
    const query = `
              PRAGMA journal_mode = WAL;
              DROP TABLE IF EXISTS ${LOCAL_DB_CONSTANTS.DB_TABLE_NAME};
              CREATE TABLE IF NOT EXISTS ${LOCAL_DB_CONSTANTS.DB_TABLE_NAME} (id INTEGER PRIMARY KEY NOT NULL, sourceName TEXT, title TEXT, urlToImage TEXT, author TEXT, publishedAt TEXT);
              `;

    await db.execAsync(query);
  };

  const insertArticles = async (
    db: SQLite.SQLiteDatabase,
    {articles}: TApiRawArticles,
  ) => {
    try {
      articles.forEach(async item => {
        const formattedTime = item?.publishedAt
          ? convertToTime(item?.publishedAt)
          : '';

        const statement = await db.prepareAsync(
          `INSERT INTO ${LOCAL_DB_CONSTANTS.DB_TABLE_NAME}  (sourceName, title, urlToImage, author, publishedAt) VALUES ($sourceName, $title, $urlToImage, $author, $publishedAt)`,
        );

        await statement.executeAsync({
          $sourceName: item?.source?.name,
          $title: item?.title,
          $urlToImage: item?.urlToImage,
          $author: item?.author,
          $publishedAt: formattedTime,
        });
      });
    } catch (error) {
      console.error('Error while insertion ', error);
    }
  };

  const getSavedArticlesForInitial = async (
    db: SQLite.SQLiteDatabase,
    neededCount: number,
    setCount: (count: string, asyncStorageKey: string) => Promise<void>,
  ): Promise<TApiNeededFields[]> => {
    try {
      const newCount = neededCount
        ? neededCount
        : LOGIC_CONSTANTS.INITIAL_BATCH_SIZE;

      const results = await db.getAllAsync<TApiNeededFields>(
        `SELECT * FROM ${LOCAL_DB_CONSTANTS.DB_TABLE_NAME} LIMIT ${newCount}`,
      );

      await setCount(`${newCount}`, ASYNC_STORAGE_KEYS.TOTAL_RECORDS_DISPLAYED);

      return results;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get saved articles from the database!');
    }
  };

  const getSavedArticlesForUpdate = async (
    db: SQLite.SQLiteDatabase,
    previouslyDisplayedCount: number,
    setCount: (count: string, asyncStorageKey: string) => Promise<void>,
  ): Promise<TApiNeededFields[]> => {
    try {
      const results = await db.getAllAsync<TApiNeededFields>(
        `SELECT * FROM ${LOCAL_DB_CONSTANTS.DB_TABLE_NAME} LIMIT ${LOGIC_CONSTANTS.UPDATE_BATCH_SIZE} OFFSET ${previouslyDisplayedCount}`,
      );

      await setCount(
        `${previouslyDisplayedCount + LOGIC_CONSTANTS.UPDATE_BATCH_SIZE}`,
        ASYNC_STORAGE_KEYS.TOTAL_RECORDS_DISPLAYED,
      );

      return results;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get saved articles from the database!');
    }
  };

  return [
    getDBConnection,
    createTable,
    insertArticles,
    getSavedArticlesForInitial,
    getSavedArticlesForUpdate,
  ];
};

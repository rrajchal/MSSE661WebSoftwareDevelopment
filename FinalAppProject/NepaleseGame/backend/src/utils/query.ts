import mysql from 'mysql';

export default async (con: mysql.Connection, query: string, params: any[]) => {
  return new Promise((resolve, reject) => {
    const handler: mysql.queryCallback = (error: mysql.MysqlError | null, result: any) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    };

    con.query(query, params, handler);
  });
};

import mysql from 'mysql';
import keys from '../config';
import util from 'util';

export function connectBD() {
  const connection = mysql.createConnection(keys.database);
  return {
    query( sql:any, args?:any ) {
      if(args!==null){
        sql=mysql.format(sql,args);
      }
      return util.promisify( connection.query )
        .call( connection, sql);
    },
    close() {
      if(connection.threadId!==null){
        util.promisify( connection.end ).call( connection )
      }
    }
  };
}
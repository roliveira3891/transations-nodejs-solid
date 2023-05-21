import CreateTransaction from "../../application/CreateTransaction"
import GetTransaction from "../../application/GetTransaction"
import TransactionRepository from "../../domain/repository/TransactionRepository"
import postgresSQLAdapter from "../database/PostgreSQLAdatper"
import TransactionDatabaseRepository from "../repository/TransactionDatatabaseRepository"
import HttpServer from "./HttpServer"


export default class Router {

    constructor (readonly httpServer: HttpServer, readonly transactionRepository: TransactionRepository){}

    async init() {
        const connection = new postgresSQLAdapter()
        const transactionRepository = new TransactionDatabaseRepository(connection)

        
        this.httpServer.on("post","/transactions", async (params: any, body: any)=> {
            const createTransaction = new CreateTransaction(this.transactionRepository)
            createTransaction.execute(body)
        })

        this.httpServer.on("get","/transactions/:code", async (params: any, body: any)=> {
            const getTransaction = new GetTransaction(this.transactionRepository)
            const transaction = await getTransaction.execute(params.code)
            return transaction
        })
    }


}
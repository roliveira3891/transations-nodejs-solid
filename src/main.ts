import ExpressAdapter from './infra/api/ExpressAdapter'
import Router  from './infra/api/Router'
import postgresSQLAdapter from './infra/database/PostgreSQLAdatper'
import TransactionDatabaseRepository from './infra/repository/TransactionDatatabaseRepository'
import TransactionMemoryRepository from './infra/repository/TransactionMemoryRepository'

//const connection = new postgresSQLAdapter()
//const transactionRepository = new TransactionDatabaseRepository(connection)
const transactionRepository = new TransactionMemoryRepository()

const httpServer = new ExpressAdapter()
const router = new Router(httpServer, transactionRepository)

router.init()

httpServer.listen(3000)




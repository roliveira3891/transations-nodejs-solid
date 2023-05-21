import CreateTransaction from "../src/application/CreateTransaction";
import { v4 as uuidv4 } from 'uuid';
import GetTransaction from "../src/application/GetTransaction";
import TransactionDatabaseRepository from "../src/infra/repository/TransactionDatatabaseRepository";
import postgresSQLAdapter from "../src/infra/database/PostgreSQLAdatper";
import TransactionMemoryRepository from "../src/infra/repository/TransactionMemoryRepository";

test("Deve Criar uma transação", async function () {
    const connection = new postgresSQLAdapter()
    //const transactionRepository = new TransactionDatabaseRepository(connection)
    const transactionRepository = new TransactionMemoryRepository() 
    
    const code = uuidv4()

    const input = {
        code,
        amount: 1000,
        numberInstallments: 12,
        paymentMethod: "credit_card"
    }

    const createTransaction = new CreateTransaction(transactionRepository)
    await createTransaction.execute(input)


    const getTransasction = new GetTransaction(transactionRepository)
    const transaction = await getTransasction.execute(code)


    expect(transaction.code).toBe(code)
    expect(transaction.amount).toBe(1000)
    expect(transaction.paymentMethod).toBe("credit_card")
    expect(transaction.installments).toHaveLength(12)
    expect(transaction.installments[0].amount).toBe(83.33)
    expect(transaction.installments[11].amount).toBe(83.37)

    await connection.close()
})
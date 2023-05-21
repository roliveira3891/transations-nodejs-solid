import Transaction from "../../domain/entity/Transaction";
import TransactionRepository from "../../domain/repository/TransactionRepository";

export default class TransactionMemoryRepository implements TransactionRepository {

    trasactions: Transaction[]


    constructor (){
        this.trasactions = []
    }


    async save(transaction: Transaction): Promise<void> {
        
        this.trasactions.push(transaction)
    
    }
    
    async get(code: string): Promise<Transaction> {

        const transaction = this.trasactions.find(transaction => transaction.code===code)
        if (!transaction) throw new Error()

        return transaction

    }

}
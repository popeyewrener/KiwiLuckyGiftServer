const spinServerLog = require("../models/spinServerLog");


exports.historyController = async(req,res)=>{
    try{
        const history = await spinServerLog.find(
            {},
            { _id: 0, __v: 0 },
            { sort: { timestamp: -1 } }
        ).limit(10);
        
        res.status(200).json(history);

    }
    catch(error){
        console.error('Error getting history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
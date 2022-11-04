import pymongo
import certifi

ca = certifi.where()
client = pymongo.MongoClient(
    "mongodb+srv://fniel8:Holadan8@10misionticgrupo5.haakeop.mongodb.net/registraduria?retryWrites=true&w=majority",
    tlsCAFile=ca
)

db = client.test
print(db)


data_base = client['registraduria']
print(data_base.list_collection_names())


candidate = data_base.get_collection('candidate')
all_candidates = candidate.delete

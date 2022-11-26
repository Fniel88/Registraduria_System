import pymongo
import certifi

# Call us the database by pymongo and certifi
ca = certifi.where()
client = pymongo.MongoClient(
    "mongodb+srv://dani8:holadan8@registraduriamisiontic2.4d1pj0x.mongodb.net/register_db?retryWrites=true&w=majority",
    tlsCAFile=ca
)

db = client.test
print(db)

# This is us database
data_base = client['register_db']
print(data_base.list_collection_names())


# candidate = data_base.get_collection('candidate')
# all_candidates = candidate.delete

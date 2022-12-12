from repositories.interface_repository import InterfaceRepository
from models.result import Result

# Class where it is calling the interface repository and receive the class Result that after it is going to
# call the AbstractModel


class ReportsRepository(InterfaceRepository[Result]):

    # Function where is using queries with mongodb for find the report
    # Function that can add the quantity of votes and filter by who had the max
    def get_votes_by_candidate(self) -> list:
        """
        :return:
        """
        query_lookup = {
            "$lookup": {
                "from": "candidate",
                "localField": "candidate.$id",
                "foreignField": "_id",
                "as": "candidate_info"
            }
        }
        query_unwind_candidate = {
            "$unwind": "$candidate_info"
        }
        query_group = {
            "$group": {
                "_id": "$candidate_info",
                "Votos": {"$sum": "$votes"}
            }
        }
        query_add_fields = {
            "$addFields": {
                "name": "$_id.name",
                "last_name": "$_id.last_name",
                "_id": "$_id._id"
            }
        }
        query_sort = {
            "$sort": {"Votos": -1}
        }
        pipeline = [query_lookup, query_unwind_candidate, query_group, query_add_fields, query_sort]
        return self.query_aggregation(pipeline)

    # Function that can add the quantity of votes and filter by which table had the min
    def votes_by_table(self) -> list:
        query_lookup = {
            "$lookup": {
                "from": "table",
                "localField": "table.$id",
                "foreignField": "_id",
                "as": "tables_info"
            }
        }
        query_unwind = {
            "$unwind": "$tables_info"
        }
        query_group = {
            "$group": {
                "_id": "$tables_info",
                "Votos": {"$sum": "$votes"}
            }
        }
        query_add_fields = {
            "$addFields": {
                "Number": "$_id.number of table",
                "_id": "$_id._id"
            }
        }
        query_sort = {
            "$sort": {"Votos": 1}
        }
        pipeline = [query_lookup, query_unwind, query_group, query_add_fields, query_sort]
        return self.query_aggregation(pipeline)

    # Function that can add the quantity of votes and filter by which party had the max
    def get_party_result(self) -> list:
        """
        :return:
        """
        query_preprocess_candidates = {
            "$lookup": {
                "from": "candidate",
                "localField": "candidate.$id",
                "foreignField": "_id",
                "as": "candidate_info"
            }
        }
        query_unwind = {
            "$unwind": "$candidate_info"
        }
        query_group_candidates = {
            "$group": {
                "_id": "$candidate_info",
                "Votos": {"$sum": "$votes"}
            }
        }
        query_add_fields = {
            "$addFields": {
                "party": "$_id.party"
            }
        }
        query_process_parties = {
            "$lookup": {
                "from": "party",
                "localField": "party.$id",
                "foreignField": "_id",
                "as": "party_info"
            }
        }
        query_unwind_party_info = {
            "$unwind": "$party_info"
        }
        query_group_parties = {
            "$group": {
                "_id": "$party_info",
                "Votos": {"$sum": "$Votos"}
            }
        }
        query_add_fields_final = {
            "$addFields": {
                "name": "$_id.name",
                "_id": "$_id._id"
            }
        }
        query_sort = {
            "$sort": {
                "Votos": -1
            }
        }
        pipeline = [query_preprocess_candidates, query_unwind, query_group_candidates, query_add_fields,
                    query_process_parties, query_unwind_party_info, query_group_parties, query_add_fields_final,
                    query_sort]
        return self.query_aggregation(pipeline)

    # Function that can add the quantity and find the percentage of votes and filter by who had the max
    def get_percentage_by_parties(self) -> list:
        winners = 15
        query_preprocess_candidates = {
            "$lookup": {
                "from": "candidate",
                "localField": "candidate.$id",
                "foreignField": "_id",
                "as": "candidate_info"
            }
        }
        query_unwind_candidates = {
            "$unwind": "$candidate_info"
        }
        query_group_candidates = {
            "$group": {
                "_id": "$candidate_info",
                "Votos": {"$sum": "$votes"}
            }
        }
        query_sort = {
            "$sort": {"Votos": -1}
        }
        query_limit = {
            "$limit": winners
        }
        query_add_fields_final = {
            "$addFields": {
                "party": "$_id.party"
            }
        }
        query_process_parties = {
            "$lookup": {
                "from": "party",
                "localField": "party.$id",
                "foreignField": "_id",
                "as": "party_info"
            }
        }
        query_unwind_party = {
            "$unwind": "$party_info"
        }
        query_group_party = {
            "$group": {
                "_id": "$party_info",
                "Final_vote": {"$sum": "$Votos"}
            }
        }
        query_add_fields_party = {
            "$addFields": {
                "name": "$_id.name",
                "_id": "$_id._id"
            }
        }
        pipeline = [query_preprocess_candidates, query_unwind_candidates, query_group_candidates, query_sort,
                    query_limit, query_add_fields_final, query_process_parties, query_unwind_party, query_group_party,
                    query_add_fields_party]
        return self.query_aggregation(pipeline)

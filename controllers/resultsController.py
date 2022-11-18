from models.result import Result
from models.table import Table
from models.candidate import Candidate
from repositories.tableRepository import TableRepository
from repositories.candidateRepository import CandidateRepository
from repositories.resultsRepository import ResultRepository


class ResultController:
    # Constructor
    def __init__(self):
        """

        :return:
        """
        self.resultRepository = ResultRepository()
        self.tableRepository = TableRepository()
        self.candidateRepository = CandidateRepository()
        print("Result controller ready...")

# GET all results
    def get_all_result(self) -> list:
        """
        This method get all the results stored in the DB
        :return: list of results
        """
        return self.resultRepository.find_all()

# GET  a result by it _id
    def get_result_by_id(self, id_: str) -> dict:
        """
        This method gets one result in the DB by providing its id
        :param id_:
        :return: result dictionary
        """
        return self.resultRepository.find_by_id(id_)

# INSERT result
    def insert_result(self, result_: dict, table_id: str, candidate_id: str) -> dict:
        """
        This method inserts a result in the DB by providing its attributes in a dictionary
        :param candidate_id:
        :param table_id:
        :param result_:
        :return: result dictionary
        """
        new_result = Result(result_)
        table_dict = self.tableRepository.find_by_id(table_id)
        table_obj = Table(table_dict)
        candidate_dict = self.candidateRepository.find_by_id(candidate_id)
        candidate_obj = Candidate(candidate_dict)
        new_result.table = table_obj
        new_result.candidate = candidate_obj
        return self.resultRepository.save(new_result)

# UPDATE result
    def update_result(self, id_: str, result_: dict) -> dict:
        """
        This method updates a result in the DB by providing its id and attributes
        :param result_:
        :param id_:
        :return: result dictionary
        """
        result = Result(result_)
        return self.resultRepository.update(id_, result)

# DELETE result
    def delete_result(self, id_: str) -> dict:
        """
        This method deletes a result in the DB by providing its id
        :param id_:
        :return: message: "Delete result"
        """
        print("Deleted " + id_)
        return self.resultRepository.delete(id_)

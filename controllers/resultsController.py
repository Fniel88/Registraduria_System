from models.result import Result
from repositories.resultsRepository import ResultRepository


class ResultController:
    # Constructor
    def __init__(self):
        """

        :return:
        """
        self.resultRepository = ResultRepository()
        print("Result controller ready...")

    def get_all_result(self) -> list:
        """
        This method get all the results stored in the DB
        :return: list of results
        """
        return self.resultRepository.find_all()

    def get_result_by_id(self, id_: str) -> dict:
        """
        This method gets one result in the DB by providing its id
        :param id_:
        :return: result dictionary
        """
        return self.resultRepository.find_by_id(id_)

    def insert_result(self, result_: dict) -> Result:
        """
        This method inserts a party in the DB by providing its attributes in a dictionary
        :param result_:
        :return: result dictionary
        """
        new_result = Result(result_)
        return self.resultRepository.save(new_result)

# UPDATE result
    def update_result(self, id_: str, result_: dict) -> dict:
        """
        This method updates a party in the DB by providing its id and attributes
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

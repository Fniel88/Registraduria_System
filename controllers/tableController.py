from models.table import Table
from repositories.tableRepository import TableRepository


class TableController:
    # Constructor
    def __init__(self):
        """

        :return:
        """
        self.tableRepository = TableRepository()
        print("Table controller ready...")
# Function that gives whole tables calling the repository

    def get_all_table(self) -> list:
        """
        This method get all the tables stored in the DB
        :return: list of tables
        """
        return self.tableRepository.find_all()
# Function that gives a table by it is id calling the repository

    def get_table_by_id(self, id_: str) -> dict:
        """
        This method gets one table in the DB by providing its id
        :param id_:
        :return: table dictionary
        """
        return self.tableRepository.find_by_id(id_)
# Function that inserts a table calling the repository

    def insert_table(self, table_: dict) -> dict:
        """
        This method inserts a party in the DB by providing its attributes in a dictionary
        :param table_:
        :return: table dictionary
        """
        new_table = Table(table_)
        return self.tableRepository.save(new_table)

# Function that updates a table calling the repository
    def update_table(self, id_: str, table_: dict) -> dict:
        """
        This method updates a party in the DB by providing its id and attributes
        :param table_:
        :param id_:
        :return: table dictionary
        """
        table = Table(table_)
        return self.tableRepository.update(id_, table)

# Function that deletes a table calling the repository
    def delete_table(self, id_: str) -> dict:
        """
        This method deletes a table in the DB by providing its id
        :param id_:
        :return: message: "Delete table"
        """
        print("Deleted " + id_)
        return self.tableRepository.delete(id_)

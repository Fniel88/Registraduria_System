from models.party import Party
from repositories.partyRepository import PartyRepository


class PartyController:
    # Constructor
    def __init__(self):
        """

        :return:
        """
        self.partyRepository = PartyRepository()
        print("Party controller ready...")

    def get_all_party(self) -> list:
        """
        This method get all the parties stored in the DB
        :return: list of parties
        """
        return self.partyRepository.find_all()

    def get_party_by_id(self, id_: str) -> dict:
        """
        This method gets one party in the DB by providing its id
        :param id_:
        :return: party dictionary
        """
        return self.partyRepository.find_by_id(id_)

    def insert_party(self, party_: dict) -> Party:
        """
        This method inserts a party in the DB by providing its attributes in a dictionary
        :param party_:
        :return: party dictionary
        """
        new_party = Party(party_)
        return self.partyRepository.save(new_party)

# UPDATE party
    def update_party(self, id_: str, party_: dict) -> dict:
        """
        This method updates a party in the DB by providing its id and attributes
        :param party_:
        :param id_:
        :return: party dictionary
        """
        party = Party(party_)
        return self.partyRepository.update(id_, party)

# DELETE party
    def delete_party(self, id_: str) -> dict:
        """
        This method deletes a party in the DB by providing its id
        :param id_:
        :return: message: "Delete party"
        """
        print("Deleted " + id_)
        return self.partyRepository.delete(id_)

# Exercise 1
class BankAccount:
    def __init__(self, balance=0, username="", password=""):
        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = False

    def authenticate(self, username, password):
        self.authenticated = (
            username == self.username and password == self.password
        )
        return self.authenticated

    def _check_authentication(self):
        if not self.authenticated:
            raise Exception("Please authenticate first.")

    def deposit(self, amount):
        self._check_authentication()

        if not isinstance(amount, int) or isinstance(amount, bool) or amount <= 0:
            raise Exception("Deposit amount must be a positive integer.")

        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        self._check_authentication()

        if not isinstance(amount, int) or isinstance(amount, bool) or amount <= 0:
            raise Exception("Withdrawal amount must be a positive integer.")

        if amount > self.balance:
            raise Exception("Insufficient funds.")

        self.balance -= amount
        return self.balance


class MinimumBalanceAccount(BankAccount):
    def __init__(
        self,
        balance=0,
        minimum_balance=0,
        username="",
        password="",
    ):
        super().__init__(balance, username, password)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        self._check_authentication()

        if not isinstance(amount, int) or isinstance(amount, bool) or amount <= 0:
            raise Exception("Withdrawal amount must be a positive integer.")

        if self.balance - amount <= self.minimum_balance:
            raise Exception("Minimum balance requirement would not be met.")

        return super().withdraw(amount)


class ATM:
    def __init__(self, account_list, try_limit):
        if not isinstance(account_list, list):
            raise Exception("account_list must be a list.")

        if not all(
            isinstance(account, (BankAccount, MinimumBalanceAccount))
            for account in account_list
        ):
            raise Exception("Invalid account in account_list.")

        self.account_list = account_list

        try:
            if not isinstance(try_limit, (int, float)) or try_limit <= 0:
                raise Exception("try_limit must be a positive number.")
            self.try_limit = try_limit
        except Exception as error:
            print(error)
            self.try_limit = 2

        self.current_tries = 0
        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n1. Log in")
            print("2. Exit")

            choice = input("Choose an option: ")

            if choice == "1":
                username = input("Username: ")
                password = input("Password: ")

                if not self.log_in(username, password):
                    return
            elif choice == "2":
                print("Goodbye.")
                return
            else:
                print("Invalid choice.")

    def log_in(self, username, password):
        for account in self.account_list:
            if account.authenticate(username, password):
                self.current_tries = 0
                self.show_account_menu(account)
                return True

        self.current_tries += 1
        print("Invalid username or password.")

        if self.current_tries >= self.try_limit:
            print("You reached the maximum number of tries.")
            return False

        return True

    def show_account_menu(self, account):
        while True:
            print("\n1. Deposit")
            print("2. Withdraw")
            print("3. Exit")

            choice = input("Choose an option: ")

            if choice == "1":
                try:
                    amount = int(input("Amount to deposit: "))
                    account.deposit(amount)
                    print(f"New balance: {account.balance}")
                except Exception as error:
                    print(error)

            elif choice == "2":
                try:
                    amount = int(input("Amount to withdraw: "))
                    account.withdraw(amount)
                    print(f"New balance: {account.balance}")
                except Exception as error:
                    print(error)

            elif choice == "3":
                account.authenticated = False
                print("Logged out.")
                return
            else:
                print("Invalid choice.")

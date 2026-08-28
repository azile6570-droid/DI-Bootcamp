
manager = None


def load_manager():
    return()


def show_user_menu():
    while True:
        print("\nRestaurant Menu Manager")
        print("V - View restaurant menu")
        print("A - Add an item")
        print("D - Delete an item")
        print("X - Exit")

        choice = input("Choose an option: ").strip().lower()

        if choice == "v":
            show_restaurant_menu()
        elif choice == "a":
            add_item_to_menu()
        elif choice == "d":
            remove_item_from_menu()
        elif choice == "x":
            manager.save_to_file()
            print("Menu was saved.")
            break
        else:
            print("Invalid choice. Please try again.")


def add_item_to_menu():
    name = input("Enter the item name: ").strip()

    try:
        price = float(input("Enter the item price: "))
        manager.add_item(name, price)
        print("item was added successfully")
    except ValueError:
        print("Please enter a valid price.")


def remove_item_from_menu():
    name = input("Enter the name of the item to remove: ").strip()

    if manager.remove_item(name):
        print("Item was deleted successfully.")
    else:
        print("There was an error: item not found.")


def show_restaurant_menu():
    print("\nRestaurant menu:")

    for item in manager.menu["items"]:
        print(f"- {item['name']}: {item['price']}")


if __name__ == "__main__":
    manager = load_manager()
    show_user_menu()

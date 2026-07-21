from models import books


def show_books():
    print("\n===== ALL BOOKS =====")
    for index, book in enumerate(books, start=1):
        status = "Borrowed" if book["borrowed"] else "Available"
        borrower = book["borrowed_by"] if book["borrowed"] else "-"
        print(f"{index}. {book['title']}")
        print(f"   Author: {book['author']}")
        print(f"   Status: {status}")
        print(f"   Borrowed By: {borrower}\n")


def borrow_book():
    show_available_books()

    try:
        choice = int(input("Enter book number to borrow: ")) - 1

        if books[choice]["borrowed"]:
            print("Book is already borrowed.")
            return

        name = input("Student name: ")

        books[choice]["borrowed"] = True
        books[choice]["borrowed_by"] = name

        print("Book borrowed successfully!")

    except:
        print("Invalid input.")


def return_book():
    show_borrowed_books()

    try:
        choice = int(input("Enter book number to return: ")) - 1

        if not books[choice]["borrowed"]:
            print("Book is already available.")
            return

        books[choice]["borrowed"] = False
        books[choice]["borrowed_by"] = ""

        print("Book returned successfully!")

    except:
        print("Invalid input.")


def show_available_books():
    print("\n===== AVAILABLE BOOKS =====")

    for index, book in enumerate(books, start=1):
        if not book["borrowed"]:
            print(f"{index}. {book['title']}")


def show_borrowed_books():
    print("\n===== BORROWED BOOKS =====")

    found = False

    for index, book in enumerate(books, start=1):
        if book["borrowed"]:
            found = True
            print(f"{index}. {book['title']} - {book['borrowed_by']}")

    if not found:
        print("No borrowed books.")


while True:

    print("\n===== LIBRARY MENU =====")
    print("1. Show All Books")
    print("2. Borrow Book")
    print("3. Return Book")
    print("4. Show Available Books")
    print("5. Show Borrowed Books")
    print("6. Exit")

    choice = input("Choose: ")

    if choice == "1":
        show_books()

    elif choice == "2":
        borrow_book()

    elif choice == "3":
        return_book()

    elif choice == "4":
        show_available_books()

    elif choice == "5":
        show_borrowed_books()

    elif choice == "6":
        print("Program Closed.")
        break

    else:
        print("Invalid choice.")
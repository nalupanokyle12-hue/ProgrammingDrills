from visitor import register_visitor
from display import show_visitors

visitor_list = []

while True:
    register_visitor(visitor_list)

    choice = input("\nWould you like to add another visitor? (yes/no): ").strip().lower()

    if choice != "yes":
        break

show_visitors(visitor_list)
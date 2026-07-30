def register_visitor(visitor_list):
    print("\n=== Visitor Registration ===")

    name = input("Visitor Name: ")
    purpose = input("Purpose of Visit: ")

    visitor = {
        "name": name,
        "purpose": purpose
    }

    visitor_list.append(visitor)
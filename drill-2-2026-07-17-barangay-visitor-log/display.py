def show_visitors(visitor_list):

    print("\n========== BARANGAY VISITOR LOG ==========")

    if len(visitor_list) == 0:
        print("No visitors have been recorded.")
        return

    for number, visitor in enumerate(visitor_list, start=1):
        print(f"{number}. {visitor['name']} - {visitor['purpose']}")

    print("------------------------------------------")
    print(f"Total Visitors: {len(visitor_list)}")
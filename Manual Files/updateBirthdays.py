import csv
import os

dataStoreLocation = "C:\\Users\\Caleb\\Documents\\Code Projects\\remember.me\\Data\\birthdayReminderStore.csv"

# Data Functions
def viewData():
    print("\nLoading Data . . . \n")
    with open(dataStoreLocation, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for row in spamreader:
            print(', '.join(row))
    
    print("\nComplete!\n")

def saveData(name, birthdate, monthOrDay, advance):
    print("\nSaving . . .\n")
    with open(dataStoreLocation, 'a', newline='') as csvfile: 
        spamwriter = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        spamwriter.writerow([name, birthdate, "Month" if int(monthOrDay)<2 else "Day", advance])
    
    print("\nSaving Complete!\n")


# main function loop
def start():
    while True:
        option = input("Welcome to the Birthday Data Entry Portal, Please Select an option: \n1. View Data\n2. Enter Data\n3. Exit\n")
        match option:
            case "1":
                viewData()
            case "2":
                while True:
                    print("\nData Entry Portal\n")
                    name = input("Name: ")
                    birthdate = input("Birthdate(MM-DD-YYYY): ")
                    month = input("Remind by Months (1) or Days (2): ")
                    advance = input("How many " + "Months: " if int(month)<2 else "Days: ")
                    saveData(name, birthdate, month, advance)
                    continueEntry = input("Continue? (y/n): ")
                    if continueEntry == "n":
                        break
            case "3":
                break
            case _:
                "Invalid Entry, please try another!"

# __name__
if __name__=="__main__":
    start()
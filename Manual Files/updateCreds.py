email = input("Email: ")
password = input("Password: ")

f = open("Data/Credentials/creds.txt", 'w')
f.write(f"{email}`{password}")
f.close()
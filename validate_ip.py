
import re

def validate_ip(ip):
    ip_regex = r'^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$'
    return re.match(ip_regex, ip) is not None

def main():
    user_ip = input("Enter an IP address: ")
    if validate_ip(user_ip):
        print(f"{user_ip} is a valid IP address.")
    else:
        print(f"{user_ip} is not a valid IP address.")

if __name__ == "__main__":
    main()

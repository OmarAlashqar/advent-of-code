def read_lines(filename):
    with open(f"input/{filename}", 'r') as file:
        return file.read().splitlines()
    
def read_lines_with_split(filename):
    with open(f"input/{filename}", 'r') as file:
        return [section.splitlines() for section in file.read().split("\n\n")]
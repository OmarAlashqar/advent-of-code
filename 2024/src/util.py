def read_lines(filename):
    with open(f"input/{filename}", 'r') as file:
        return file.read().splitlines()
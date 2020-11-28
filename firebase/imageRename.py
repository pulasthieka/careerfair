# function to rename files in a folder downloaded form google drive that contains files collected in a form
import glob
import os
files = glob.glob(
    "../../Profiles/**")  # folder path
names = open(
    './students.txt').read().splitlines()  # identifier in order of submission
print(len(names), len(files))
files.sort(key=os.path.getmtime, reverse=False)
for i in range(len(names)):
    os.rename(
        files[i], f"../../Profiles/{names[i]}.jpg")

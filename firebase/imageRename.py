# function to rename files in a folder downloaded form google drive that contains files collected in a form
import glob
import os
files = glob.glob(
    "E:/Projects/University/Career Fair 2020/Profiles/**")  # folder path
names = open(
    'E:/Projects/University/Career Fair 2020/WebApplication/firebase/students.txt').read().splitlines()  # identifier in order of submission
print(len(names), len(files))
files.sort(key=os.path.getmtime, reverse=False)
for i in range(len(names)):
    os.rename(
        files[i], f"E:/Projects/University/Career Fair 2020/ProfilesNew/{names[i]}.jpg")

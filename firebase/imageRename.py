import glob
import os
files = glob.glob("absoluteFolderPath\**")
names = open('students.txt').read().splitlines()
print(len(names), len(files))
files.sort(key=os.path.getmtime, reverse=False)
for i in range(len(names)):
    os.rename(
        files[i], f"absoluteFolderPath\{names[i]}.jpg")

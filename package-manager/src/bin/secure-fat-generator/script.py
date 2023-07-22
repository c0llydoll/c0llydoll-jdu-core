import os, sys
from pathlib import Path
import binascii
totalfilescount = 0

#Credits to Taylor Swift and rat

v = 1
outputfolder = ((sys.argv[1:])[0])
platform = ((sys.argv[1:])[1])
sfpath = Path(outputfolder, "secure_fat.gf").resolve()
if (Path(sfpath).exists()):
    os.remove(sfpath)

filelist=os.listdir(outputfolder)
for fichier in filelist[:]: # filelist[:] makes a copy of filelist.
    if not(fichier.endswith(".ipk")):
        filelist.remove(fichier)

filelist.sort()

for a in filelist:
 with open(Path(outputfolder, a).resolve(), 'rb') as f:
     content = f.read()
     filescount = int((binascii.hexlify(content[44:48])).decode(), 16)
     totalfilescount+=filescount
     f.close()
     print(str(v) + " from " + str(len(filelist)) + " IPKS counted. Total files: " + str(totalfilescount))
     v+=1

with open (Path(outputfolder, filelist[0]).resolve(), 'rb') as f:
    content = f.read()  
    thingafterusft = (binascii.hexlify(content[36:40])).decode()
    f.close()

howmanyfiles = hex(totalfilescount).split('x')[-1]
howmanyzeroadd = 8 - len(howmanyfiles)
zeros1 = str("0" * howmanyzeroadd)

with open(sfpath, "ab") as g:
 try:
  g.write(binascii.unhexlify("55534654" + thingafterusft + "00000001" + zeros1 + howmanyfiles))
  g.close()
 except Exception:
  g.write(binascii.unhexlify("55534654" + thingafterusft + "00000001" + zeros1 + howmanyfiles))
  g.close()

a = 76
b = 80
i = 0

hashstep = 1

for eachipk in filelist:
 hashend = filelist.index(eachipk)
 with open(Path(outputfolder, eachipk).resolve(), 'rb') as f:
  content = f.read()
  howmanyfiles = int((binascii.hexlify(content[44:48])).decode(), 16)
  while i < howmanyfiles:
   lenoffilename = int(((binascii.hexlify(content[a:b])).decode()), 16)
   a+=4
   b+=lenoffilename
   filename = (content[a:b].decode())
   a+=len(filename)
   b+=4
   pathlen = int(binascii.hexlify(content[a:b]).decode(), 16)
   a+=4
   b+=pathlen
   path = (content[a:b].decode())
   a+=pathlen
   b+=4
   securefatgfcode = ((binascii.hexlify(content[a:b])).decode())
   if len(hex(hashend)[2:]) < 2:
    with open(sfpath, "ab") as g:
      g.write(binascii.unhexlify(securefatgfcode + "000000010" + hex(hashend)[2:]))
      g.close()
      f.close()
   else:
    with open(sfpath, "ab") as g:
      g.write(binascii.unhexlify(securefatgfcode + "00000001" + hex(hashend)[2:]))
      g.close()
      f.close()
   i+=1
   a+=36
   b+=36
   hashstep+=1
  if i == howmanyfiles:
   a = 76
   b = 80
   i = 0

if len(hex(len(filelist))[2:]) < 2:
 with open(sfpath, "ab") as g:
      g.write(binascii.unhexlify("0000000" + hex(len(filelist))[2:]))
      g.close()
else:
 with open(sfpath, "ab") as g:
      g.write(binascii.unhexlify("000000" + hex(len(filelist))[2:]))
      g.close()

ipknamestep = 1
lenplatform = len(platform) + 5
for eachipkname in filelist:
    ipkname = eachipkname[:-lenplatform]
    hexipkname = "".join("{:02x}".format(ord(c)) for c in ipkname)
    hexlenofbundlename = hex(len(ipkname))[2:]
    howmanyzeroadd = 8 - len(hexlenofbundlename)
    zeros = "0" * howmanyzeroadd
    with open(sfpath, "ab") as g:
      bundleid = filelist.index(eachipkname)
      if len(hex(bundleid)[2:]) < 2:
       g.write(binascii.unhexlify("0" + str(hex(bundleid)[2:]) + zeros + hexlenofbundlename + hexipkname))
       g.close()
       ipknamestep+=1
      else:
       g.write(binascii.unhexlify(str(hex(bundleid)[2:]) + zeros + hexlenofbundlename + hexipkname))
       g.close()
       ipknamestep+=1
    

from django.core.management.base import BaseCommand
from django.core.files import File
from home.models import Equipment
import requests
from tempfile import NamedTemporaryFile
import os

class Command(BaseCommand):
    help = 'Load initial equipment data'

    def download_image(self, url):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                img_temp = NamedTemporaryFile(delete=True)
                img_temp.write(response.content)
                img_temp.flush()
                return img_temp
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Failed to download image: {str(e)}'))
        return None

    def handle(self, *args, **kwargs):
        # Initial equipment data with image URLs
        equipment_data = [
            {
                "name": "Desktop Milling Machine with ATC",
                "quantity": 1,
                "manufacturer": "Roland",
                "model_number": "MDX 50",
                "notes": "Desktop CNC milling machine with Automatic Tool Changer",
                "image_url": "https://images.squarespace-cdn.com/content/v1/5b75fc7ea9e028d726dbaaa5/1534602772396-3DGGES3IIFLP9Q3LE5K5/mdx-50-hero.jpg"
            },
            {
                "name": "PCB Printing Machine",
                "quantity": 1,
                "manufacturer": "Volterra",
                "model_number": "V-one",
                "notes": "PCB prototyping machine",
                "image_url": "https://www.voltera.io/wp-content/uploads/2019/06/V-One-1.jpg"
            },
            {
                "name": "Single Nozzle 3D Printer",
                "quantity": 12,
                "manufacturer": "Fracktral Works",
                "model_number": "Julia Advance",
                "notes": "FDM 3D printer",
                "image_url": "https://cdn.shopify.com/s/files/1/0261/7276/4601/products/Julia-Pro-Single_1024x1024@2x.jpg"
            },
            {
                "name": "Soldering Station",
                "quantity": 10,
                "manufacturer": "Weller",
                "model_number": "WSD 1010",
                "notes": "Temperature controlled soldering station",
                "image_url": "https://media.rs-online.com/t_large/F7959491-01.jpg"
            },
            {
                "name": "Soldering Station",
                "quantity": 8,
                "manufacturer": "Soldron",
                "model_number": "SL958",
                "notes": "Basic soldering station",
                "image_url": "https://m.media-amazon.com/images/I/61+-CgmkOBL.jpg"
            },
            {
                "name": "Table Top Multimeter",
                "quantity": 15,
                "manufacturer": "GW Instek",
                "model_number": "GDM 8245",
                "notes": "Digital bench multimeter",
                "image_url": "https://www.gwinstek.com/en-global/products/downloadSeriesImages/2067/1"
            },
            {
                "name": "Digital Oscilloscope 100mhz",
                "quantity": 15,
                "manufacturer": "GW Instek",
                "model_number": "1102 B",
                "notes": "100MHz Digital Oscilloscope",
                "image_url": "https://www.gwinstek.com/en-global/products/downloadSeriesImages/1534/1"
            },
            {
                "name": "Power supply",
                "quantity": 15,
                "manufacturer": "GW Instek",
                "model_number": "GPE 4323",
                "notes": "Laboratory power supply",
                "image_url": "https://www.gwinstek.com/en-global/products/downloadSeriesImages/1982/1"
            },
            {
                "name": "Desktop i7",
                "quantity": 5,
                "manufacturer": "HP",
                "model_number": "P280",
                "notes": "Desktop computer workstation",
                "image_url": "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06045686.png"
            },
            {
                "name": "Computerised Sewing Machine",
                "quantity": 2,
                "manufacturer": "USHA",
                "model_number": "DREAM MAKER",
                "notes": "Digital sewing machine",
                "image_url": "https://www.usha.com/media/catalog/product/cache/9686df74726eefcfb23dbb2c45213a96/d/r/dream_maker_30_1.jpg"
            },
            {
                "name": "Dual nozzle 3D Printer",
                "quantity": 1,
                "manufacturer": "Fracktral Works",
                "model_number": "Twin Dragon",
                "notes": "Dual extruder 3D printer",
                "image_url": "https://cdn.shopify.com/s/files/1/0261/7276/4601/products/Julia-Pro-Dual_1024x1024@2x.jpg"
            },
            {
                "name": "Laser cutting machine",
                "quantity": 3,
                "manufacturer": "Suresh Indu laser",
                "model_number": "AccuCut 1212",
                "notes": "CO2 laser cutting system",
                "image_url": "https://5.imimg.com/data5/SELLER/Default/2021/3/KO/QG/XG/3823480/co2-laser-cutting-machine.jpg"
            },
            {
                "name": "Vinyl Printing & Cutting Machine",
                "quantity": 1,
                "manufacturer": "Roland",
                "model_number": "BN 20 A",
                "notes": "Print and cut vinyl machine",
                "image_url": "https://www.rolanddg.com.au/-/media/roland/images/products/printers/bn-20a/bn-20a_main.jpg"
            },
            {
                "name": "3D Scanner",
                "quantity": 1,
                "manufacturer": "Shinning 3D",
                "model_number": "EinScan SP",
                "notes": "3D scanning system",
                "image_url": "https://www.3dscanco.com/products/3d-scanners/einscan-sp/einscan-sp-1.jpg"
            },
            {
                "name": "Vacuum forming Machine",
                "quantity": 4,
                "manufacturer": "Mayku",
                "model_number": "Formbox",
                "notes": "Desktop vacuum forming system",
                "image_url": "https://cdn.shopify.com/s/files/1/0267/3534/7027/products/Product1_1024x1024@2x.jpg"
            },
            {
                "name": "Lathe Machine - CNC",
                "quantity": 2,
                "manufacturer": "Proxxon",
                "model_number": "PD 400 CNC",
                "notes": "CNC lathe machine",
                "image_url": "https://www.proxxon.com/images/produkte/geraete/24500.jpg"
            },
            {
                "name": "Milling Machine - CNC",
                "quantity": 2,
                "manufacturer": "Proxxon",
                "model_number": "FF 500 CNC",
                "notes": "CNC milling machine",
                "image_url": "https://www.proxxon.com/images/produkte/geraete/24360.jpg"
            },
            {
                "name": "CNC Router",
                "quantity": 1,
                "manufacturer": "SIL",
                "model_number": "1325",
                "notes": "CNC routing system",
                "image_url": "https://5.imimg.com/data5/SELLER/Default/2021/6/UP/YC/DN/3823480/cnc-router-machine.jpg"
            },
            {
                "name": "Band Saw",
                "quantity": 1,
                "manufacturer": "Makita",
                "model_number": "LB1200F",
                "notes": "Band saw for cutting",
                "image_url": "https://www.makita.co.nz/media/catalog/product/cache/5/image/1800x/040ec09b1e35df139433887a97daa66f/l/b/lb1200f_1.png"
            },
            {
                "name": "Scroll Saw",
                "quantity": 1,
                "manufacturer": "Dewalt",
                "model_number": "DW788",
                "notes": "Scroll saw for detailed cutting",
                "image_url": "https://mobileimages.lowes.com/productimages/41a4f36c-4103-43c0-9d46-b3d9c9d48d20/00915431.jpg"
            }
        ]

        # First install requests if not already installed
        try:
            import requests
        except ImportError:
            self.stdout.write(self.style.WARNING('Installing requests package...'))
            os.system('pip install requests')
            import requests

        # Delete existing equipment
        Equipment.objects.all().delete()
        
        # Create new equipment
        for item in equipment_data:
            try:
                # Extract image_url and remove it from the data to be passed to create()
                image_url = item.pop('image_url')
                
                # Create equipment without image first
                equipment = Equipment.objects.create(**item)
                
                # Download and add image
                img_temp = self.download_image(image_url)
                if img_temp:
                    file_name = os.path.basename(image_url)
                    equipment.image.save(file_name, File(img_temp), save=True)
                    img_temp.close()
                
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created equipment: {item["name"]}')
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'Failed to create equipment {item["name"]}: {str(e)}')
                )

        self.stdout.write(
            self.style.SUCCESS('Successfully loaded all equipment data')
        )


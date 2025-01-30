import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Replace 'backend.settings' with your project settings module
django.setup()

from home.models import Project  # Replace 'home' with your app name if different

# List of project data to add
project_data = [
    {
        "project_name": "TENG powered emergency assistance system",
        "faculty_mentors": "Prof. Hitendra Kumar, Prof. I. A. Palani",
        "selected_students": "Anmol Jain (che230008009@iiti.ac.in), Hilori Jain (ee230002028@iiti.ac.in), Jairaj Lad (me230003029@iiti.ac.in), Priyanshu Patel (che230008026@iiti.ac.in), Mahi Shah (che230008030@iiti.ac.in), Mitanshu Kumawat (che230008022@iiti.ac.in)"
    },
    {
        "project_name": "Bioreactor platform for synthetic tissue conditioning",
        "faculty_mentors": "Prof. Hitendra Kumar, Prof. Vijai Laxmi",
        "selected_students": "Kshitij Amarnath (me220003049@iiti.ac.in), Kaustuv Devmishra (me220003045@iiti.ac.in), Mihir Hemani (me220003052@iiti.ac.in), Mankad Nehansh (ee220002050@iiti.ac.in)"
    },
    {
        "project_name": "Automatic cleaner for blackboard chalk duster",
        "faculty_mentors": "Prof. Anand Parey, Prof. Ram Bilas Pachori",
        "selected_students": "Praneetha (mems230005025@iiti.ac.in), Udaya Sree (ee230002085@iiti.ac.in), Nidarsana M (ce230004031@iiti.ac.in), Jaya Sree mems (mems230005030@iiti.ac.in), DARA NISSI KRITHIKA (ee230002021@iiti.ac.in)"
    },
    {
        "project_name": "Light-driven freeform micro 3D printing",
        "faculty_mentors": "Prof. Hitendra Kumar, Prof. Vibhor Pandhare",
        "selected_students": "Saket Jaiswal (me230003064@iiti.ac.in), Adinath Apte (me230003004@iiti.ac.in), Abhijeet Parmar (ee230002001@iiti.ac.in), Nitin Mewara (ee230002048@iiti.ac.in)"
    },
    {
        "project_name": "Designing cell pressure systems for investigating high-pressure environments",
        "faculty_mentors": "Prof. Sivaraj Mohana Sundaram, Prof. Dan Sathiaraj",
        "selected_students": "Rucha Prabhu (me230003060@iiti.ac.in), Nandini Kumari (cse230001056@iiti.ac.in), Koyna Pandit (me230003034@iiti.ac.in), Dhriti Jha (sse230021007@iiti.ac.in)"
    },
    {
        "project_name": "Development of an in-house scanning tank system for mapping the acoustic field for characterizing ultrasonic transducers.",
        "faculty_mentors": "Prof. Lokesh Basavarajappa, Prof. Srivathsan Vasudevan",
        "selected_students": ""
    },
    {
        "project_name": "Design a phonocardiography circuit to record heart sounds and suppress noise using machine learning algorithms",
        "faculty_mentors": "Prof. Lokesh Basavarajappa, Prof. Sourav Chandra, Prof. Puneet Gupta",
        "selected_students": "Bommireddy Varun Kumar Reddy (mc230041006@iiti.ac.in), Sai Chathura (ce230004004@iiti.ac.in), Adikam Manogna (me230003003@iiti.ac.in), BASSETTY SAI RAM SWAROOP TEJA (cse230010013@iiti.ac.in), AVVARU VENKATA SAI DEEPAK (cse230010011@iiti.ac.in)"
    },
    {
        "project_name": "Development of AI-Nanopore Technology for High-Throughput, Cost-Effective, and Ultrafast DNA Sequencing",
        "faculty_mentors": "Prof. Biswarup Pathak, Prof. Parimal Kar",
        "selected_students": ""
    },
    {
        "project_name": "Development of FMCW radar for sensing range and imaging",
        "faculty_mentors": "Prof. Unmesh Khati, Prof. Abhirup Datta",
        "selected_students": "MAJETI TEJO RAMA VIGNESWAR (me230003039@iiti.ac.in), PREM PRATIK (sse230021012@iiti.ac.in), SRI VARSHA DODDA (me230003074@iiti.ac.in), NISARG RATHOD (sse230021014@iiti.ac.in)"
    },
    {
        "project_name": "Design and development of EMG-based bionic hand",
        "faculty_mentors": "Prof. Sourav Chandra, Prof. I. A. Palani",
        "selected_students": ""
    },
    {
        "project_name": "To design and develop a low-cost digital stethoscope",
        "faculty_mentors": "Prof. Puneet Gupta, Prof. Lokesh Basavarajappa",
        "selected_students": "K Bharath Varma (ee230002032@iiti.ac.in), K Sai Babu (cse230001036@iiti.ac.in), Pavan Kumar (ce230004018@iiti.ac.in), G Yochana Mythri (me230003023@iiti.ac.in), V Sathvika (ee230002083@iiti.ac.in)"
    },
    {
        "project_name": "Developing battery setup for rice transplanter for promoting automatic operation",
        "faculty_mentors": "Prof. Jayaprakash Murugesan",
        "selected_students": ""
    },
    {
        "project_name": "Water quality mapping and analysis in lakes/ponds using UAV",
        "faculty_mentors": "Prof. Unmesh Khati, Prof. Priyank Sharma, Prof. Umesh Kshirsagar",
        "selected_students": "Cheepati Gireesh kumar reddy (mems230005013@iiti.ac.in), Sumanth (ce230004021@iiti.ac.in), Yogi (me230003056@iiti.ac.in), Manthru (me230003055@iiti.ac.in), Deepak AVS (cse230001011@iiti.ac.in), Jangam vidya sagar (ce230004020@iiti.ac.in)"
    },
    {
        "project_name": "YUKTIYANA - A MULTI CAPABLE ROBOT",
        "faculty_mentors": "Prof. Vijay A S, Prof. Ayan Mondal, Prof. Eswara",
        "selected_students": "Vardhan Bhalgat (ee220002026@iiti.ac.in), Shivam Sundaram (ce220004045@iiti.ac.in), Hrishikesh Hiremath (me220003037@iiti.ac.in), Mrunal Nandpure (mems220005036@iiti.ac.in), Boddula Vashista (me220003020@iiti.ac.in), Ampady B R (me220003008@iiti.ac.in), Atiharsh Bhatt (mems230005008@iiti.ac.in), Abhitulya Mishra (ee230002002@iiti.ac.in), Tejas Bhavekar (me230003079@iiti.ac.in), Kavya Patel (me230003050@iiti.ac.in), Satwik Chaubey (ep230051017@iiti.ac.in), Giddaluru Divya (me220003032@iiti.ac.in)"
    },
    {
        "project_name": "Remote controlled vehicle for creating firebreaks",
        "faculty_mentors": "Prof. Devendra Deshmukh, Prof. Amod Umarikar",
        "selected_students": "Vaishnavi (me220003068@iiti.ac.in), Kapila (me220003033@iiti.ac.in), Akhilesh (me220003006@iiti.ac.in), Chandrika Akasapu (me220003005@iiti.ac.in), Pippalla Bhaskara Venkat Phani (ee230002050@iiti.ac.in), Marpu Jagan Mohan (ee230002040@iiti.ac.in), Prathamesh Kawtikwar (me220003063@iiti.ac.in)"
    },
    {
        "project_name": "Mechanical Structure for an Affordable 2-Meter Radio Telescope",
        "faculty_mentors": "Prof. Narendra Nath Patra, Prof. Kazi Sabiruddin, Prof. Saptarshi Ghosh",
        "selected_students": "Giddaluru Divya (me220003032@iiti.ac.in), Joreegala Nithisha (me220003043@iiti.ac.in)"
    },
    {
        "project_name": "Control System for an Affordable 2-Meter Radio Telescope",
        "faculty_mentors": "Prof. Narendra Nath Patra, Prof. Saptarshi Ghosh, Prof. Kazi Sabiruddin",
        "selected_students": ""
    },
    {
        "project_name": "Development of Small scale Mechanical testing setup",
        "faculty_mentors": "Prof. Eswara Prasad Korimilli, Prof. Vijay A.S, Dr. Anand Petare",
        "selected_students": "Krithika K S (me220003067@iiti.ac.in), Madhusree A (me220003019@iiti.ac.in), Lakshmi Priya N (me220003039@iiti.ac.in)"
    }
]

# Add project data to the database
for project in project_data:
    obj, created = Project.objects.get_or_create(
        project_name=project['project_name'],
        faculty_mentors=project['faculty_mentors'],
        selected_students=project['selected_students']
    )
    if created:
        print(f"Added: {project['project_name']}")
    else:
        print(f"Skipped: {project['project_name']} (already exists)")

#from pathlib import Path as pathlib_path
import pathlib
import json
from models.SalesRepSearch import SalesRepSearch

__CURRENT_FILE = pathlib.Path(__file__).resolve()
__ROOT_DIR = __CURRENT_FILE.parents[2]
__DUMMY_DATA_PATH = __ROOT_DIR / "dummyData.json"
__FAIL_DATA_PATH = __ROOT_DIR / "failData.json"


with open(__DUMMY_DATA_PATH, "r") as f:
    DUMMY_DATA = json.load(f)

with open(__FAIL_DATA_PATH, "r") as f:
    FAIL_DATA = json.load(f)

ROLE_LIST = ["Senior Sales Executive", "Sales Representative", "Account Manager", "Business Development Manager",
             "Regional Sales Manager"]
REGION_LIST = ["North America", "Europe", "Asia-Pacific", "South America", "Middle East"]

CLIENT_LIST = [{"id":1, "name": "Acme Corp", "industry": "Manufacturing", "contact": "alice@acmecorp.com"},
               {"id":2, "name": "Beta Ltd", "industry": "Retail", "contact": "contact@betaltd.com"},
               {"id":3, "name": "Omega Inc", "industry": "Logistics", "contact": "info@omegainc.com"},
               {"id":4, "name": "Gamma Inc", "industry": "Tech", "contact": "info@gammainc.com"},
               {"id":5, "name": "Delta LLC", "industry": "Finance", "contact": "support@deltallc.com"},
               {"id":6, "name": "Sigma Corp", "industry": "Biotech", "contact": "hello@sigmacorp.com"},
               {"id":7, "name": "Epsilon Ltd", "industry": "Healthcare", "contact": "contact@epsilonltd.com"},
               {"id":8, "name": "Zeta Corp", "industry": "Finance", "contact": "sales@zetacorp.com"},
               {"id":9, "name": "Theta Enterprises", "industry": "Logistics", "contact": "contact@thetaenterprises.com"},
               {"id":10, "name": "Eta Co", "industry": "Energy", "contact": "info@etaco.com"},
               {"id":11, "name": "Theta Inc", "industry": "Telecommunications", "contact": "sales@thetainc.com"},
               {"id":12, "name": "Iota Group", "industry": "Consulting", "contact": "support@iotagroup.com"},
               {"id":13, "name": "Iota Ltd", "industry": "Hospitality", "contact": "contact@iotaltd.com"},
               {"id":14, "name": "Kappa LLC", "industry": "Retail", "contact": "info@kappallc.com"},
               {"id":15, "name": "Lambda Partners", "industry": "Real Estate", "contact": "team@lambdapartners.com"}
               ]

INDUSTRY_LIST = ["Biotech", "Consulting", "Energy", "Finance", "Healthcare", "Hospitality", "Logistics",
                   "Manufacturing", "Real Estate", "Retail", "Tech", "Telecommunications"]

description_dict = {}

for field_name, field_info in SalesRepSearch.model_fields.items():
    description_dict[field_name] = field_info.description

DESCRIPTION_POST_ROUTER = f"""
       Returns multiple reps based on the Search criteria (stored in 'body'):\n
       - name: {description_dict['name']}\n
       - role: {description_dict['role']}\n
       - region: {description_dict['region']}\n
       - activeClient: {description_dict['activeClient']}\n
       - pastClient: {description_dict['pastClient']}\n
       - industry: {description_dict['industry']}\n
       - minValue: {description_dict['minValue']}\n
       - maxValue: {description_dict['maxValue']}\n
    """

DOC_DESCRIPTION = """
Hello, my name is **Kristian**.

* I am a graduate from **Bina Nusantara International University** who seeks a job in **InterOpera Pte. Ltd.** as a **Software Engineer.** 

* I possess experience in **website programming** and **software programming** and **database management**. 

* I am **patient** and **a quick-learner.**

* I am able to **adapt to the company’s programming environment as needed with enough training.** 

* With experience in programming field for **11-12 years**, I am ready to develop new applications and managing existing 
features within a company’s applications or installing new ones as demanded.

* My experience mostly is about being a **Backend Developer**, but sometimes I was asked to also handle **Frontend** or being **Fullstack Developer**.

* This Full Stack program is developed with **FastAI** (with **Python** as the base language) for Backend and **NextJS** for Frontend.

* It should be noted that I am **mainly a Java Developer**, but as shown, I am able to **adapt to Python or other languages in demand.**

* The AI model used for the optional AI feature is **Cohere**.

## HOW TO START THE PROJECT

I assume that you have cloned the folder from GitHub and have the needed Node.js and Python packages installed. 

If you want to use the AI feature, make sure to get your API key from Cohere, and put it in your environment variable: **COHERE_API_KEY**

Afterwards:

1. Open a terminal and get to the **backend** folder.
2. Execute: **uvicorn main:app --host 0.0.0.0 --port 8000 --reload**
3. Open another terminal and get to the **frontend** folder
4. Execute **npm run dev**
5. Open **localhost:3000** or what is directed by the npm run dev in a browser

## DESIGN CHOICES

* The design is rather simplistic because what is needed is to display the data. There's no need to make overly exciting images 
* And it's also very common within backend projects with UI in various offices.
* However, it is also set to ensure that there won't be overflow and everything can be contained without creating any scroll bars.
* Therefore, Pagination system is implemented. And it can be done exclusively within the frontend rather than having to use the backend, which would take more time.
* Everything is made to emulate the MVC architecture, since it's what I have been dealing with throughout my years of programming.
* Backend represents the Model and Controller, Frontend represents the View. 
* Object Oriented Programming is also implemented in this as it's what I do for a living. 

## POTENTIAL IMPROVEMENTS

* Database implementation would be nice if this app, especially the datas, can expand into something more complex.
* Modal-based messages (for warning or information) or forms
* Charts can be nice, but it will require more numerical datas.
* Login system and security to filter website access.
* Varying fonts
* Ensuring that this can be as mobile-friendly as possible
* Implement compatibility throughout most browsers (IE: Firefox, Safari)

If you are interested in hiring me, feel free to contact me via mail (below) or WhatsApp: +6285766883929
"""
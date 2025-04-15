from fastapi import APIRouter, Request, Path

from data.data import *
from services.service import get_single_sales_rep as service_get_single_sales_rep
from services.service import get_filtered_sales_reps
from services.ai_service import ai_answer_question
from models.SalesRepSearch import SalesRepSearch


router = APIRouter()

@router.get("/sales-reps")
def get_data():
    """
        Returns all available sales reps. Is called when the page loads or user makes a search with empty filters
    """
    return DUMMY_DATA

@router.get("/get-roles")
def get_roles():
    """
        Returns all available sales rep roles (Used to fill Role Option List)
    """
    return {"roles": ROLE_LIST}


@router.get("/get-regions")
def get_regions():
    """
        Returns all available sales rep regions (Used to fill Region Option List)
    """
    return {"regions": REGION_LIST}

@router.get("/get-industries")
def get_industries():
    """
        Returns all industries of clients that have dealt with the rep (Used to fill Industry Option List)
    """
    return {"industries": INDUSTRY_LIST}

@router.get("/get-clients")
def get_clients():
    """
        Returns all clients that has dealt with the rep (Used to fill Active/Past Client Option Lists)
    """
    return {"clients": CLIENT_LIST}


@router.get("/sales-rep/{rep_id}")
def get_single_sales_rep(rep_id: int = Path(...,description="The id of the sales rep used to identify which rep to pick")):
    """
        Returns one rep based on their id. Used to call the details of one single rep to be displayed in the contents
        - **rep_id**: Put the rep id in here. It has to be integer
    """
    return service_get_single_sales_rep(DUMMY_DATA,FAIL_DATA,rep_id)


@router.post("/sales-reps", description=DESCRIPTION_POST_ROUTER)
def get_sales_reps(body: SalesRepSearch):
    return get_filtered_sales_reps(DUMMY_DATA, body)


@router.post("/ai")
async def ai_endpoint(request: Request):
    """
    Accepts a user question and returns an answer with AI model based on Cohere
    """
    body = await request.json()
    return ai_answer_question(body)
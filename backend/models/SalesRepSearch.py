from pydantic import BaseModel, Field
from typing import Optional

class SalesRepSearch(BaseModel):
    name: Optional[str] = Field(None, description="Name of the sales rep to search for")
    role: Optional[str] = Field(None, description="Role/position of the sales rep")
    region: Optional[str] = Field(None, description="The region the rep is assigned to")
    activeClient: Optional[str] = Field(None, description="Clients currently dealing with the rep")
    pastClient: Optional[str] = Field(None, description="Clients that have made deals with the rep (active or not)")
    industry: Optional[str] = Field(None, description="The industries associated with the clients")
    minValue: Optional[str] = Field(None, description="Minimum deal value between an active client and rep")
    maxValue: Optional[str] = Field(None, description="Maximum deal value between an active client and rep")
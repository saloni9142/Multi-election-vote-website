import Thumbnail1 from './assets/flag1.jpg'
import Thumbnail2 from './assets/flag2.jpg'



import Candidate1 from './assets/candidate1.jpg'
import Candidate2 from './assets/candidate2.jpg'
import Candidate3 from './assets/candidate3.jpg'
import Candidate4 from './assets/candidate4.jpg'
import Candidate5 from './assets/candidate5.jpg'
import Candidate6 from './assets/candidate6.jpg'
import Candidate7 from './assets/candidate7.jpg'

export const elections =[
    {
        id: "e1",
        title: "Election 2025",
        description: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`,
        thumbnail: Thumbnail1,
        candidates: ["c1","c2","c3","c4"],
        voters: []
     },
      {
        id: "e2",
        title: "Election 2025",
        description: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`,
        thumbnail: Thumbnail2,
        candidates: ["c1","c2","c3","c4"],
        voters: []
     },
     
]


export const candidates=[
    {
        id: "c1",
        fullName: "saloni kumari",
        image: Candidate1,
        moto: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`,
        voteCount: 23,
        elections: "e1",

    },
     {
        id: "c2",
        fullName: "saloni kumari",
        image: Candidate2,
        moto: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`,
        voteCount: 23,
        elections: "e1",

    },
     {
        id: "c3",
        fullName: "saloni kumari",
        image: Candidate3,
        moto: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`,
        voteCount: 23,
        elections: "e1",

    }
]

export const voters =[
    {
        id: "v1",
        fullName: "saloni kumari",
        email: "sal@123gmail.com",
        password: "saloni123",
        isAdmin: true,
        votedElection :["e2"]
    },
     {
        id: "v2",
        fullName: "saloni kumari",
        email: "sal@123gmail.com",
        password: "saloni123",
        isAdmin: true,
        votedElection :["e2"]
    },
    
     {
        id: "v3",
        fullName: "saloni kumari",
        email: "sal@123gmail.com",
        password: "saloni123",
        isAdmin: true,
        votedElection :["e2"]
    },
     {
        id: "v4",
        fullName: "saloni kumari",
        email: "sal@123gmail.com",
        password: "saloni123",
        isAdmin: true,
        votedElection :["e2"]
    },
     {
        id: "v5",
        fullName: "saloni kumari",
        email: "sal@123gmail.com",
        password: "saloni123",
        isAdmin: true,
        votedElection :[]
    }
]
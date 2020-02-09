import Home from './components/Home'
import About from './components/About'
import LoginForm from './components/forms/LoginForm'
import RegForm from './components/forms/RegForm'
// Patient
import PatientHome from './components/Patient/PatientHome'
import PatientProfile from './components/Patient/PatientProfile'
import PatientKarton from './components/Patient/PatientKarton'
import PatientProfileUpdate from './components/Patient/PatientProfileUpdate'
import PatientHistory from './components/Patient/PatientHistory'
import PatientKartonDetails from './components/Patient/PatientKartonDetails'
//Patient/lista klinika
import PatientClinicList from './components/Patient/PatientClinicList'
import PatientDoctorListFromClinic from './components/Patient/PatientDoctorListFromClinic'

import PatientClinicProfile from './components/Patient/PatientClinicProfile'
import PatientDoctorListFromProfile from './components/Patient/PatientDoctorListFromProfile'

import PatientOverviewPregled from './components/Patient/PatientOverviewPregled'
import PatientPredefPregled  from './components/Patient/PatientPredefPregled'
import PatientFuturePregled  from './components/Patient/PatientFuturePregled'
// import ToDo from './components/ToDo1'

import PatientHomeSlide from './components/Patient/PatientHomeSlide'

export default [
    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
        path:'/about',
        name:'About',
        component:About 
    },
    {
        path:'/login',
        name:'LoginForm',
        component:LoginForm
    },
    {
        path:'/registration',
        name:'RegistrationForm',
        component:RegForm
    },

    {
        //path:'/patient/:id/profile', id unikatan za datog korisnika...
        path:'/patient/',
        name:'PatientHome',
        components:{
            default:PatientHome,
        },
        children:[
            {
                //Cim se udje u home pacijenta difoltni prikaz ekrana
                path:'/patient/',
                name:'PatientHomeSlide',
                components:{
                    patientHome:PatientHomeSlide
                }
            },
            {        
                path:'profile',
                name:'PatientProfile',
                components:{
                    patientHome:PatientProfile
                }
            },
            {        
                path:'profile/update',
                name:'PatientProfileUpdate',
                components:{
                    patientHome:PatientProfileUpdate
                }
            },
            {        
                path:'karton',
                name:'PatientKarton',
                components:{
                    patientHome:PatientKarton
                }
            },
            {        
                path:'karton/details/:id',
                name:'PatientKartonDetails',
                components:{
                    patientHome:PatientKartonDetails
                }
            },

            {        
                path:'history',
                name:'PatientHistory',
                components:{
                    patientHome:PatientHistory
                }
            },


            {        
                path:'/patient/zakazaniPregledi',
                name:'ZakazaniPregledi',
                components:{
                    patientHome:PatientFuturePregled
                }
            },

           
            {        
                path:'clinicList',
                name:'ClinicList',
                components:{
                    patientHome:PatientClinicList
                }
            },
            {      //:idKlinike
                path:'clinicList/profile/:id',
                name:'PatientClinicProfile',
                components:{
                    patientHome:PatientClinicProfile
                }
            },
            {        
                path:'clinicList/doctorList',
                name:'ClinicList',
                components:{
                    patientHome:PatientDoctorListFromClinic
                }
            },
            
            //iz profila klinike -->
           
            {        //:idKlinike
                path:'clinicList/profile/:id/doctorList',
                name:'ClinicListFromProfile',
                components:{
                    patientHome:PatientDoctorListFromProfile
                }
            },

            
            {        //:idKlinike
                path:'clinicList/profile/:id/predefPregledi',
                name:'PatientPrefePregled',
                components:{
                    patientHome:PatientPredefPregled 
                }
            },

            
            {        
                path:'clinicList/overview/:termin_id',
                name:'PatientOverviewCustomPregled',
                components:{
                    patientHome:PatientOverviewPregled 
                }
            },

            {        
                path:'clinicList/profile/:id/overview/:termin_id',
                name:'PatientOverviewCustomPregled',
                components:{
                    patientHome:PatientOverviewPregled 
                }
            },
            
            //dovde <--
           
        ]

    },

]
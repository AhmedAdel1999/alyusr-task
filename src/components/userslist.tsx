import { useMutation,useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";


type User={
    Result:{
        User_Name:string,
        Name:string,
        Name_En:string,
        IsAdmin:boolean,
        ID:number,
    }[]
}
const UsersList  = () =>{

    //get all users
    const {data,refetch}=useQuery<User>({
        queryKey:['getAllUsers'],
        queryFn:async()=>{
            const res=await axios.get("https://alyusrmobileapi.alyusrsoft.com/GetUsersList")
            return res.data
        }
    })

    //delete user
    const {mutate:deleteUser,isPending}=useMutation({
        mutationFn:async(id:number)=>{
            const res=await axios.post(`https://alyusrmobileapi.alyusrsoft.com/DeleteUser?id=${id}`)
            return res.data
        },
        onSuccess:()=>{
            refetch()
        }
    })

    return(
        <div className="flex flex-col gap-4">  
           <div className="py-4 px-10 bg-[#060625] text-white text-lg">بيانات سابقة</div>
           <div className="px-10">
            <table className="min-w-full border border-gray-300">
                    <thead>
                    <tr className="bg-gray-800 text-white text-right">
                        <th className="px-4 py-2 w-[220px]">اسم المستخدم</th>
                        <th className="px-4 py-2 w-[150px]">الاسم</th>
                        <th className="px-4 py-2 w-[120px]">مدير نظام</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data&&data.Result.map((user, index) => (
                        <tr
                        key={user.ID}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                        >
                        <td className="px-4 py-2 border">{user.User_Name}</td>
                        <td className="px-4 py-2 border">{user.Name_En}</td>
                        <td className="px-4 py-2 border">
                            {user.IsAdmin ? "Yes" : "No"}
                        </td>
                        <td className="px-4 py-2 border w-full flex gap-4 justify-end">
                            <button 
                               className="bg-blue-500 text-white py-2 px-6 rounded-md"
                            >
                                <Link 
                                   to={`/${user.ID}`}
                                   className="block h-full w-ful"
                                >
                                    تعديل
                                </Link>    
                            </button>
                            <button 
                                    className="bg-red-500 text-white flex items-center gap-2 py-2 px-6 rounded-md"
                                    onClick={()=>deleteUser(user.ID)}
                                >
                                    حذف
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
           </div>
        </div>
    )     
}
export default UsersList;
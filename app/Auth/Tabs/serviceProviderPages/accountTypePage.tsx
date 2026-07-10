import { IoShieldOutline } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";


const AccountTypePage = () => {
  return (
    <div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "10px" }}>
            <h1 style={{color: "#191C1E", fontWeight: "700", fontSize: "40px", lineHeight: "48px", letterSpacing: "-1.2px", textAlign: "center"}}>Choose your Account Type</h1>
            <p style={{color: "#434654", fontSize: "18px", lineHeight: "29.25px", fontWeight: "400", textAlign: "center"}}>Select the role that best matches your responsibilities within the organization.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-20 mt-6">
            <div className="flex-1 bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" style={{display: "flex", flexDirection: "column",  gap: "10px", width: "300px"}}>
                <IoShieldOutline size={25} />
                <h2 className="text-xl font-semibold">Organization Administrator</h2>
                <p >Register a new service provider entity. Full access to billing, team management, organization settings.</p>
                <p style={{color: "#003D9B", fontWeight: "500"}}>Select Administrator</p>
            </div>
            <div className="flex-1 bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" style={{display: "flex", flexDirection: "column",  gap: "10px", width: "300px"}}>
                <MdPeopleAlt size={25} />
                <h2 className="text-xl font-semibold">Team Member</h2>
                <p >For independent professionals seeking to offer their services.</p>
                <p style={{color: "#003D9B", fontWeight: "500"}}>Select Team Member</p>
            </div>
        </div>
        <div style={{marginTop: "40px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <p>Already have an account? <a href="/login" style={{color: "#003D9B", fontWeight: "500"}}>Sign in</a></p>
        </div>
    </div>
  );
}


export default AccountTypePage;
import AdminSidebar from "../components/AdminSidebar"
import MainSection from "../components/MainSection"
import Navbar from "../components/Navbar"

const AdminDashboard = () => {
    return (

        <div className="h-screen w-full bg-[#F3F3F3] overflow-hidden">
            <div className="flex h-full gap-3 p-3">
                <aside className="h-full shrink-0">
                    <AdminSidebar />
                </aside>
                <main className="flex min-w-0 flex-1 flex-col gap-3">
                    <Navbar />
                    <section className="min-h-0 flex-1 overflow-y-auto">
                        <MainSection />
                    </section>
                </main>
            </div>
        </div>


    )
}

export default AdminDashboard

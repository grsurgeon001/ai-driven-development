import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">의료 컨퍼런스 환자 등록</h1>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="outline" className="ml-4">
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <Button>환자 등록</Button>
              <Button variant="outline">간이 등록</Button>
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="환자 검색..."
                className="px-4 py-2 border rounded-md"
              />
              <select className="px-4 py-2 border rounded-md">
                <option value="">컨퍼런스 유형</option>
                <option value="global">Global</option>
                <option value="endoscopy">Endoscopy</option>
                <option value="pathologic">Pathologic</option>
                <option value="radiologic">Radiologic</option>
              </select>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {/* 환자 목록이 여기에 동적으로 렌더링됩니다 */}
              <li className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">홍길동</p>
                    <p className="text-sm text-gray-500">Patient ID: 12345</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      논의중
                    </span>
                    <Button variant="outline" size="sm">
                      상세보기
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

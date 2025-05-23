import { Button } from "@/components/ui/button";

export default function FastRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              간이 환자 등록
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              기본 정보만 입력하여 빠르게 등록할 수 있습니다. 나중에 상세 정보를
              추가할 수 있습니다.
            </p>
            <form className="mt-6 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  환자 이름
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="patient-id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Patient ID
                </label>
                <input
                  type="text"
                  name="patientId"
                  id="patient-id"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" type="button">
                  취소
                </Button>
                <Button type="submit">간이 등록</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

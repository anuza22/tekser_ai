import { CheckCircleIcon } from "@heroicons/react/24/outline";

const ConfirmReset = () => {
  return (
          <div className="flex justify-center mb-6">
            <div className="bg-success-100 rounded-full p-2">
              <div className="bg-success-200 rounded-full p-2">
                <CheckCircleIcon className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </div>
  );
};

export default ConfirmReset;

type ProgressBarProps = {
    value?: number; // Optional prop to set the progress value
}

export default function ProgressBar({ value = 20 }: ProgressBarProps) {

    const progress = Math.floor(value); // Ensure value is an integer

    const num = `${progress}%`; // Convert to percentage string



    return (
        <div className="w-[80%] h-2 bg-gray-200 rounded-full mt-4 mx-auto">
            <div className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-in-out" style={{ width: num }}></div>
        </div>
    );
}
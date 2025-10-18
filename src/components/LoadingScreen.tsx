// components/LoadingScreen.tsx
const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#783162] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p
                    className="text-[#2d2d2d] font-medium"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;
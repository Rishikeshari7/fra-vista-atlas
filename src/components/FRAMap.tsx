import SimpleMap from "@/components/SimpleMap";

interface FRAMapProps {
  fullSize?: boolean;
}

const FRAMap = ({ fullSize = false }: FRAMapProps) => {
  return <SimpleMap fullSize={fullSize} />;
};

export default FRAMap;
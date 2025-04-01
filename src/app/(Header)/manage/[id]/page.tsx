import ManageItemList from "./ManageItemList";

export async function generateStaticParams() {
  // 여기서는 미리 생성할 ID 목록을 반환합니다
  // 실제 데이터 소스에서 ID를 가져오는 로직으로 대체할 수 있습니다
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

const Page = () => {
  return <ManageItemList />;
};

export default Page;

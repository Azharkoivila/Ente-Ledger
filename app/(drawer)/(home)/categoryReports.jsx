import { withObservables } from "@nozbe/watermelondb/react";
import { useState } from "react";
import { View } from "react-native";
import getStamp from "../../../src/utils/date/getCalender";
import CategoryRepository from "../../../src/utils/db/repository/categoryRepository";
import transactionRepository from "../../../src/utils/db/repository/txnRepository";
import WithAnimation from "../../hoc/withAnimation";
import CatogoryRepoertScreen from "../../modules/categoryReports";
const ObservableCategoryReport = withObservables(
  ["start", "end", "category"],
  ({ start, end, category }) => ({
    transactions: transactionRepository.obseerveRangeWithCategery(
      start,
      end,
      category,
    ),
    categoryList: CategoryRepository.observeCategory(),
  }),
)(CatogoryRepoertScreen);

function CategoryReports() {
  const [calenderFilter, setcalenderFilter] = useState("Weekly");
  const [categoryFilter, setcategoryFilter] = useState({
    name: "category",
    value: "salary",
  });
  const data = getStamp(calenderFilter);

  return (
    <View
      className="px-3 pt-3"
      style={{
        flex: 1,
      }}
    >
      <ObservableCategoryReport
        start={data.start}
        end={data.end}
        category={categoryFilter.value}
        setcategoryFilter={setcategoryFilter}
        setcalenderFilter={setcalenderFilter}
      />
    </View>
  );
}

const animatedCategeryReport = WithAnimation(CategoryReports);
export default animatedCategeryReport;

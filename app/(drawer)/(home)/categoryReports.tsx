import { CategoryFilter, TimeStamp } from "@/src/types";
import { withObservables } from "@nozbe/watermelondb/react";
import { useState } from "react";
import { View } from "react-native";
import getStamp from "../../../src/utils/date/getCalender";
import CategoryRepository from "../../../src/utils/db/repository/categoryRepository";
import transactionRepository from "../../../src/utils/db/repository/txnRepository";
import WithAnimation from "../../hoc/withAnimation";
import CategoryReportScreen from "../../modules/categoryReports";
const ObservableCategoryReport = withObservables(
  ["start", "end", "category"],
  ({ start, end, category }) => ({
    transactions: transactionRepository.observeRangeWithCategory(
      start,
      end,
      category,
    ),
    categoryList: CategoryRepository.observeCategory(),
  }),
)(CategoryReportScreen);

function CategoryReports() {
  const [calenderFilter, setCalenderFilter] = useState<string>("Weekly");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>({
    name: "category",
    value: "salary",
  });
  const timeStamp: TimeStamp = getStamp(calenderFilter);

  return (
    <View
      className="px-3 pt-3"
      style={{
        flex: 1,
      }}
    >
      <ObservableCategoryReport
        start={timeStamp.start}
        end={timeStamp.end}
        category={categoryFilter.value}
        setCategoryFilter={setCategoryFilter}
        setCalenderFilter={setCalenderFilter}
      />
    </View>
  );
}

const animatedCategoryReport = WithAnimation(CategoryReports);
export default animatedCategoryReport;

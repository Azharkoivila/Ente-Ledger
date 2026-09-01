import { CategoryFilter, TimeStamp } from "@/src/types";
import accountRepository from "@/src/utils/db/repository/accountRepository";
import { getOneCategory } from "@/src/utils/db/services/transactionService";
import { withObservables } from "@nozbe/watermelondb/react";
import { useEffect, useState } from "react";
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
    user: accountRepository.observeUser(),
  }),
)(CategoryReportScreen);

function CategoryReports() {
  const [calenderFilter, setCalenderFilter] = useState<string>("Weekly");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>({
    name: "",
    value: "",
  });
  const timeStamp: TimeStamp = getStamp(calenderFilter);
  useEffect(() => {
    let cancel = false;
    async function getCategory() {
      const category = await getOneCategory();
      if (!category) return;
      if (!cancel) {
        setCategoryFilter({
          name: String(category.categoryName),
          value: String(category.categoryValue),
        });
      }
    }
    getCategory();

    return () => {
      cancel = true;
    };
  }, []);
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

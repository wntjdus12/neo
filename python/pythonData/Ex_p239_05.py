import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams['font.family'] = 'NanumBarunGothic'

filename = 'ex802.csv'
myframe = pd.read_csv(filename, encoding='utf-8', index_col='type')
print(myframe)

myframe.plot(title='지역별 차종 교통량량', kind='line', rot=0, legend=True)

filename = 'Ex_p239_DataframeGraph01.png'
plt.savefig(filename, dpi=400, bbox_inches='tight')
print(filename + ' saved')
plt.show()
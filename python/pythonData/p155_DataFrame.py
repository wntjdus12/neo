from pandas import DataFrame 

sdata = {
    '도시' : ['서울', '서울', '서울', '부산', '부산'],
    '연연도' : [2020, 2021, 2022, 2021, 2022],
    '실적' : [150, 170, 360, 240, 290],
}

myindex = ['one', 'two', 'three', 'four', 'five']
myframe = DataFrame(data=sdata, index=myindex)
print('\nType : ', type(myframe))

myframe.index.name = 'Columns1'
print('\nColumns Information')
print(myframe.columns)

myframe.index.name = 'Index1'
print('\nIndex Information')
print(myframe.index)

print('\nInner Data Information')
print(type(myframe.values))
print(myframe.values)

print('\nData Type Information')
print(myframe.dtypes)

print('\nContext Information')
print(myframe)

print('\nrow, col Information')
print(myframe.T)

print('\nColumns Property Usage')
mycolumns = ['연도', '도시', '실적']
newframe = DataFrame(data=sdata, index=myindex, columns=mycolumns)
print(newframe)


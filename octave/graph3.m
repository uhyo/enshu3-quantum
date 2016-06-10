fid = fopen('../data/hypercube-antipodal-3.txt', 'r', 'native');
# fid2 = fopen('../data/hypercube-annealing-2.txt', 'r', 'native');
fid2 = fopen('../data/hypercube-annealing-4.txt', 'r', 'native');
# fid3 = fopen('../data.txt', 'r', 'native');
fid3 = fopen('../data/hypercube-antipodal-3.txt', 'r', 'native');

data = fscanf(fid, '%d %d %f %f',[4, Inf]);
data2 = fscanf(fid2, '%d %d %f %f',[4, Inf]);
data3 = fscanf(fid3, '%d %d %f %f',[4, Inf]);

figure(1);
clf;
hold on;
plot(data(1,:), data(4,:), 'b-', 'linewidth', 3);
plot(data2(1,:), data2(4,:), 'r-', 'linewidth', 3);

set(gca, 'fontsize', 20);

hx = xlabel('n');
#set(hx, 'fontsize', 14);
hy = ylabel('t');
#set(hy, 'fontsize', 14);

